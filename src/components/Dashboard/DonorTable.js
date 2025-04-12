import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { updateDonor, deleteDonor } from '../../services/Donorapi'; // ✅ Import function
import SideBar from "./SideBar";
import "../../styles/DonorTable.css"

const DonorTable = () => {
    const { donors, setDonors } = useCart();
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // ✅ Handle Edit Click (Opens Modal)
    const handleEdit = (donor) => {
        console.log("Editing Donor:", donor); // Debugging
        setSelectedDonor({ ...donor }); // Ensure object copy
        setShowModal(true);
    };

    // ✅ Handle Update Donor
    const handleUpdate = async () => {
        if (!selectedDonor) return;

        const success = await updateDonor(selectedDonor._id, selectedDonor);
        if (success) {
            setDonors((prevDonors) =>
                prevDonors.map((donor) =>
                    donor._id === selectedDonor._id ? selectedDonor : donor
                )
            );
            setShowModal(false);
        }
    };

    // ✅ Handle Delete Donor
    const handleDelete = async (id) => {
        const success = await deleteDonor(id);
        if (success) {
            setDonors((prevDonors) => prevDonors.filter((donor) => donor._id !== id));
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="dashboard-content">
                    <h2 className="text-danger text-start m-4">Blood Donor Details...</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Blood Type</th>
                                <th>Area</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {donors.map((donor) => (

                                <tr key={donor._id}>
                                    <td>{donor.firstName} {donor.lastName}</td>
                                    <td>{donor.bloodType}</td>
                                    <td>{donor.area}</td>
                                    <td>{donor.phone}</td>
                                    <td>{donor.status}</td>
                                    <td>
                                        <div className="d-flex align-items-center ">
                                            <button className="btn btn-success  p-1 me-3 w-50" onClick={() => handleEdit(donor)}><i className="bi bi-pencil-square me-1"></i>Edit</button>
                                            <button className="btn bg-danger p-1 me-3 w-50" onClick={() => handleDelete(donor._id)}><i className="bi bi-trash me-1 "></i>Delete</button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ✅ Edit Modal (Fix Visibility) */}
            {showModal && selectedDonor && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="mb-3">Edit Donor</h3>
                        <input type="text" className="form-control mb-2" value={selectedDonor.firstName} onChange={(e) => setSelectedDonor({ ...selectedDonor, firstName: e.target.value })} />
                        <input type="text" className="form-control mb-2" value={selectedDonor.lastName} onChange={(e) => setSelectedDonor({ ...selectedDonor, lastName: e.target.value })} />
                        <input type="text" className="form-control mb-2" value={selectedDonor.bloodType} onChange={(e) => setSelectedDonor({ ...selectedDonor, bloodType: e.target.value })} />
                        <input type="text" className="form-control mb-2" value={selectedDonor.area} onChange={(e) => setSelectedDonor({ ...selectedDonor, area: e.target.value })} />
                        <input type="text" className="form-control mb-2" value={selectedDonor.phone} onChange={(e) => setSelectedDonor({ ...selectedDonor, phone: e.target.value })} />
                        {/* <input type="text" className="form-control mb-2" value={selectedDonor.status} onChange={(e) => setSelectedDonor({ ...selectedDonor, status: e.target.value })} /> */}
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-success me-2 w-25" onClick={handleUpdate}>Save</button>
                            <button className="btn bg-danger w-25" onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DonorTable;
