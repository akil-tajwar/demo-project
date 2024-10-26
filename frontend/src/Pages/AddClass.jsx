import { useState } from 'react';

const AddClass = () => {
    const [title, setTitle] = useState('');
    const [banner, setBanner] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const classData = { title, banner, category, price, details };

        try {
            const response = await fetch('http://localhost:4000/api/class/createClass', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(classData),
            });
            if (response.ok) {
                alert('Class added successfully');
                setTitle('');
                setBanner('');
                setCategory('');
                setPrice('');
                setDetails('');
            } else {
                alert('Failed to add class');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding class');
        }
    };

    return (
        <div className="w-1/2 mx-auto pt-10">
            <h3 className='text-3xl font-semibold pb-5 text-center'>Add Class</h3>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-10 rounded-lg'>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="title" placeholder="Title" className="input border rounded-md p-1 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" name="banner" placeholder="Banner URL" className="input border rounded-md p-1 w-full" value={banner} onChange={(e) => setBanner(e.target.value)} />
                    <input type="text" name="category" placeholder="Category" className="input border rounded-md p-1 w-full" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input type="text" name="price" placeholder="Price" className="input border rounded-md p-1 w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <textarea name="details" placeholder="Details" className="input border rounded-md p-1 w-full col-span-2" value={details} onChange={(e) => setDetails(e.target.value)} />
                </div>
                <div className="text-right">
                    <button type="submit" className="border bg-white rounded-md px-3 py-1 mt-4">
                        Add Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;
