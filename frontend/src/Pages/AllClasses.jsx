import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

const AllClasses = () => {
    const [classes, setClasses] = useState([]);
    const [visibleDropdown, setVisibleDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    // Fetch classes from the backend
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/class/getAllClass');
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        fetchClasses();
    }, []);

    // Toggle dropdown visibility
    const toggleDropdown = (id, e) => {
        e.stopPropagation();
        setVisibleDropdown(visibleDropdown === id ? null : id);
    };

    // Close dropdown on outside click
    const handleOutsideClick = (e) => {
        if (!e.target.closest(".dropdown-container")) {
            setVisibleDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    // Open modal with selected class details
    const handleUpdate = (id) => {
        const classToEdit = classes.find((singleClass) => singleClass._id === id);
        setSelectedClass({ ...classToEdit });
        setIsModalOpen(true);
    };

    // Save updated class data
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/class/updateClass/${selectedClass._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedClass),
            });
            if (response.ok) {
                const updatedClass = await response.json();
                setClasses(classes.map((singleClass) =>
                    singleClass._id === selectedClass._id ? updatedClass : singleClass
                ));
                setIsModalOpen(false);
                alert('Class updated successfully');
            } else {
                alert('Failed to update class');
            }
        } catch (error) {
            console.error('Error updating class:', error);
        }
    };

    // Delete a class
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/class/deleteClass/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setClasses(classes.filter((singleClass) => singleClass._id !== id));
                alert("Class deleted successfully");
            } else {
                alert("Failed to delete class");
            }
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    return (
        <div className="w-3/4 mx-auto pt-10">
            <h3 className='text-3xl font-semibold pb-5 text-center'>All Classes</h3>
            <div className="grid grid-cols-4 gap-7">
                {classes.map((singleClass) => (
                    <div key={singleClass._id} className="border rounded-lg relative">
                        <img className="h-48 w-full object-cover rounded-t-lg border-b" src={singleClass.banner} alt={singleClass.title} />
                        <div className="p-3">
                            <h4 className="text-2xl">{singleClass.title}</h4>
                            <p>{singleClass.category}</p>
                            <p className="py-4">{singleClass.details}</p>
                            <h4 className="text-2xl">${singleClass.price}</h4>
                        </div>
                        <div className="absolute right-4 top-4 dropdown-container">
                            <BsThreeDots
                                className="bg-slate-100 border cursor-pointer absolute right-0 p-1 text-3xl rounded-full"
                                onClick={(e) => toggleDropdown(singleClass._id, e)}
                            />
                            {visibleDropdown === singleClass._id && (
                                <div className="border bg-white w-52 p-3 rounded-md absolute right-0 top-10 z-10">
                                    <div
                                        onClick={() => handleUpdate(singleClass._id)}
                                        className="cursor-pointer flex gap-3 hover:bg-slate-200 p-2 rounded-md"
                                    >
                                        <MdEdit className="tooltip p-1 text-2xl bg-slate-200 border border-black rounded-full" />
                                        <p>Update Class</p>
                                    </div>
                                    <div
                                        onClick={() => handleDelete(singleClass._id)}
                                        className="cursor-pointer flex gap-3 hover:bg-slate-200 p-2 rounded-md"
                                    >
                                        <RiDeleteBin5Line className="tooltip p-1 text-2xl bg-slate-200 border border-black rounded-full" />
                                        <p>Delete Class</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="border bg-slate-200 rounded-b-md w-full py-1 mt-4 text-xl">Buy</button>
                    </div>
                ))}
            </div>

            {/* Modal for updating class */}
            {isModalOpen && selectedClass && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Update Class</h3>
                        <input
                            type="text"
                            value={selectedClass.title}
                            onChange={(e) => setSelectedClass({ ...selectedClass, title: e.target.value })}
                            placeholder="Title"
                            className="border w-full p-2 mb-4"
                        />
                        <input
                            type="text"
                            value={selectedClass.banner}
                            onChange={(e) => setSelectedClass({ ...selectedClass, banner: e.target.value })}
                            placeholder="Banner URL"
                            className="border w-full p-2 mb-4"
                        />
                        <input
                            type="text"
                            value={selectedClass.category}
                            onChange={(e) => setSelectedClass({ ...selectedClass, category: e.target.value })}
                            placeholder="Category"
                            className="border w-full p-2 mb-4"
                        />
                        <input
                            type="text"
                            value={selectedClass.price}
                            onChange={(e) => setSelectedClass({ ...selectedClass, price: e.target.value })}
                            placeholder="Price"
                            className="border w-full p-2 mb-4"
                        />
                        <textarea
                            value={selectedClass.details}
                            onChange={(e) => setSelectedClass({ ...selectedClass, details: e.target.value })}
                            placeholder="Details"
                            className="border w-full p-2 mb-4"
                        />
                        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                            Save Changes
                        </button>
                        <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllClasses;
