import React from "react";

const Filter = ({ selectedType, onFilterChange }) => {
    return (

        <div className="row ">
            <div className="col"></div>

            <div className="col bg-light rounded shadow-sm">
                <div className="mb-4 p-3  ">
                    <h5 className="mb-3">Filter by Blood Type</h5>
                    <select
                        value={selectedType}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="form-select"
                    >
                        <option value="All">All</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
            </div>
            <div className="col"></div>
        </div>



    );
};

export default Filter;
