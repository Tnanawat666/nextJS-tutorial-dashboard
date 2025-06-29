'use server';

import { date, z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string().min(1, 'Customer is required'),
    amount: z.coerce.number().min(1, 'Amount is required'),
    status: z.enum(['pending', 'paid'], { errorMap: () => ({ message: 'Status must be either pending or paid' }) }),
    date: z.string().datetime({ offset: true }).optional(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({ customerId: formData.get('customerId'), amount: formData.get('amount'), status: formData.get('status') });
    const amountInCents = Math.round(amount * 100);
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    // console.log('Creating invoice with data:', { customerId, amount, status, date, amountInCents });

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
    } catch (error) {
        console.error('Error inserting invoice:', error);
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });
    const amountInCents = Math.round(amount * 100);

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}`;
    } catch (error) {
        console.error('Error updating invoice:', error);
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {

    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}