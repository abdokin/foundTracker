import React from 'react';
import Image from 'next/image';
import { API_URL } from '@/lib/constants';

export default function Page() {
    const reclamation = {
        id: 1,
        sujet: "Mon cart",
        description: "When submitting a reclamation, you can increase its effectiveness by adding attachments. Attachments allow you to provide additional context, evidence, or supporting documents related to your reclamation.",
        code: "20240522T124401421088542788",
        item: {
            id: 1,
            name: "Ivana Fitzgerald",
            description: "Eiusmod quisquam com",
            foundDateTime: "2024-05-22T12:43:37.934376",
            status: "FOUND",
            images: [
                { id: 1, imageUrl: "2d944211-2d0a-4c6c-b298-2521b5726395.jpg" },
                { id: 2, imageUrl: "05e55378-d65e-4f97-91c9-3d8daa251a7a.jpg" },
                { id: 3, imageUrl: "17034738-8e69-4dd5-a364-4e4ec351aaca.jpg" }
            ]
        },
        status: "APPROVED",
        user: {
            id: 2,
            firstname: "USER",
            lastname: "Admin",
            email: "client@mail.com",
            role: "USER"
        },
        docs: [
            { id: 1, documentUrl: "fe601fd3-40e6-45ef-a83e-37f7600c5c26.jpg", documentName: "badge.jpg" },
            { id: 2, documentUrl: "095bdf3b-3bfd-4630-a272-d7614601ff94.jpg", documentName: "my-cart.jpg" },
            { id: 3, documentUrl: "48e9b8e5-0da7-4484-8c2c-55bc6f44e4f4.pdf", documentName: "random.pdf" }
        ]
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center py-4">
                <div className="text-3xl">Reclamation Document</div>
                <img src="/logo.png" alt=" " className='w-24 ml-auto' />

            </div>
            <table className="border-collapse border w-full mb-4">
                <thead>
                    <tr className="border">
                        <th colSpan={2} className="p-4 font-semibold  ">
                            <p>PRODUCT RECLAMATION nr {reclamation.code}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border">
                        <td className="p-4">Sujet:</td>
                        <td className="p-4">{reclamation.sujet}</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Description:</td>
                        <td className="p-4">{reclamation.description}</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Status:</td>
                        <td className="p-4">{reclamation.status}</td>
                    </tr>
                    <tr className="border">
                        <td colSpan={2} className="p-4 font-semibold">Item Details</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Name:</td>
                        <td className="p-4">{reclamation.item.name}</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Description:</td>
                        <td className="p-4">{reclamation.item.description}</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Found Date:</td>
                        <td className="p-4">{new Date(reclamation.item.foundDateTime).toLocaleString()}</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Status:</td>
                        <td className="p-4">{reclamation.item.status}</td>
                    </tr>
                    <tr className="border">
                        <td colSpan={2} className="p-4 font-semibold">Images</td>
                    </tr>
                    <tr className="border">
                        <td colSpan={4} className="p-4 flex  gap-2">
                            {reclamation.item.images.map(image => (
                                <img key={image.id} src={API_URL + "/files/" + image.imageUrl} alt={image.imageUrl} className="w-24 h-24 object-cover" />
                            ))}
                        </td>
                    </tr>
                    <tr className="border">
                        <td colSpan={2} className="p-4 font-semibold">User Details</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Name:</td>
                        <td className="p-4">{reclamation.user.firstname} {reclamation.user.lastname}</td>
                    </tr>
                    <tr className="border">
                        <td className="p-4">Email:</td>
                        <td className="p-4">{reclamation.user.email}</td>
                    </tr>
                    <tr className="border">
                        <td colSpan={2} className="p-4 font-semibold">Attached Documents</td>
                    </tr>
                    <tr className="border">
                        <td colSpan={2} className="p-4">
                            <ul>
                                {reclamation.docs.map(doc => (
                                    <li key={doc.id} className="flex items-center space-x-2">
                                        <a href={API_URL + "/files/" + doc.documentUrl} className="text-blue-600 underline">{doc.documentName}</a>
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
