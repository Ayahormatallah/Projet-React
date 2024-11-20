import React, { useState } from "react";
import "./AccountForm.css";

const AccountForm = ({ isEdit, account, onBack }) => {
    const [formData, setFormData] = useState({
        solde: account?.solde || "",
        dateCreation: account?.dateCreation?.split("T")[0] || "",
        type: account?.type || "EPARGNE",
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = isEdit
                ? `http://localhost:8085/banque/comptes/${account.id}`
                : "http://localhost:8085/banque/comptes";
            const method = isEdit ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage(isEdit ? "Compte modifié avec succès !" : "Compte ajouté avec succès !");
                setTimeout(() => onBack(), 2000); // Retourne à la liste après 2 secondes
            } else {
                throw new Error("Erreur lors de l'enregistrement.");
            }
        } catch (err) {
            console.error(err);
            setSuccessMessage("Erreur lors de la soumission.");
        }
    };

    return (
        <div className="form-container">
            <h2>{isEdit ? "Modifier le Compte" : "Ajouter un Compte"}</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="account-form">
                <div className="form-group">
                    <label>Solde:</label>
                    <input
                        type="number"
                        value={formData.solde}
                        onChange={(e) => setFormData({ ...formData, solde: e.target.value })}
                        required
                        placeholder="Ex: 1500.00"
                    />
                </div>
                <div className="form-group">
                    <label>Date de Création:</label>
                    <input
                        type="date"
                        value={formData.dateCreation}
                        onChange={(e) => setFormData({ ...formData, dateCreation: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="EPARGNE">Épargne</option>
                        <option value="COURANT">Courant</option>
                    </select>
                </div>
                <div className="button-group">
                    <button type="submit" className="btn submit-btn">
                        {isEdit ? "Modifier" : "Ajouter"}
                    </button>
                    <button type="button" className="btn cancel-btn" onClick={onBack}>
                        Retour
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountForm;
