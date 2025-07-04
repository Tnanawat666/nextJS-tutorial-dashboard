import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { fetchInvoiceById } from '@/app/lib/data';
import { Invoice } from '../../../../lib/definitions';
import { notFound } from 'next/navigation';

// Fix props type error
type PageProps = {
    params: {
        id: string;
    };
};

export default async function Page({ params }: PageProps) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);
    if (!invoice) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    { label: 'Edit Invoice', href: `/dashboard/invoices/${id}/edit`, active: true },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}