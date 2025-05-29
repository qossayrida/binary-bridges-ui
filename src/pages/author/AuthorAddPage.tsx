import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '../../components/ui';
import { apiCreateAuthor } from '../../service/authorservice.ts';
import type { AuthorDTO } from '@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models';

// ✅ Schema for validation using Zod
const AuthorSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    country: z.string().min(2, 'Country is required'),
});

type AuthorFormData = z.infer<typeof AuthorSchema>;

const AuthorAddPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AuthorFormData>({
        resolver: zodResolver(AuthorSchema),
    });

    const onSubmit = async (data: AuthorFormData) => {
        try {
            await apiCreateAuthor(data as AuthorDTO);
            alert('Author added successfully!');
            reset();
        } catch (err) {
            console.error('Failed to add author:', err);
            alert('Failed to add author');
        }
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Add New Author</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <Input
                    label="Author Name"
                    placeholder="Enter author name"
                    {...register('name')}
                    error={errors.name?.message}
                />

                <Input
                    label="Country"
                    placeholder="Enter country"
                    {...register('country')}
                    error={errors.country?.message}
                />

                <div className="ui-flex ui-justify-end pt-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Add Author'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AuthorAddPage;
