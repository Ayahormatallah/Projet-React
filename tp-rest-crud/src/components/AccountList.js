import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AccountList.css";

const AccountList = ({ onEdit }) => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get("http://localhost:8085/banque/comptes");
            setAccounts(response.data);
        } catch (err) {
            setError("Erreur lors de la récupération des comptes.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
            try {
                await axios.delete(`http://localhost:8085/banque/comptes/${id}`);
                setAccounts(accounts.filter((account) => account.id !== id)); // Met à jour la liste
            } catch (err) {
                setError("Erreur lors de la suppression du compte.");
            }
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="account-container">
            <h2>Liste des Comptes</h2>
            <div className="table-wrapper">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Solde</th>
                            <th>Date de Création</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    Aucun compte disponible.
                                </td>
                            </tr>
                        ) : (
                            accounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.id}</td>
                                    <td>{Number(account.solde).toFixed(2)}</td>
                                    <td>{account.dateCreation.split("T")[0]}</td>
                                    <td>{account.type}</td>
                                    <td>
                                        <button
                                            className="btn edit-btn"
                                            onClick={() => onEdit(account)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn delete-btn"
                                            onClick={() => handleDelete(account.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountList;
