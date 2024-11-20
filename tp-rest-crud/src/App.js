import React, { useState } from "react";
import AccountList from "./components/AccountList";
import AccountForm from "./components/AccountForm";

const App = () => {
    const [currentPage, setCurrentPage] = useState("list");
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleEdit = (account) => {
        setSelectedAccount(account);
        setCurrentPage("edit");
    };

    return (
        <div className="app">
            <header className="header">
                <h1>Gestion des Comptes</h1>
                <nav>
                    <button
                        className={`menu-button ${currentPage === "list" ? "active" : ""}`}
                        onClick={() => { setCurrentPage("list"); setSelectedAccount(null); }}
                    >
                        Voir la Liste
                    </button>
                    <button
                        className={`menu-button ${currentPage === "add" ? "active" : ""}`}
                        onClick={() => { setCurrentPage("add"); setSelectedAccount(null); }}
                    >
                        Ajouter un Compte
                    </button>
                </nav>
            </header>
            <main className="main">
                {currentPage === "list" && <AccountList onEdit={handleEdit} />}
                {(currentPage === "add" || currentPage === "edit") && (
                    <AccountForm
                        isEdit={currentPage === "edit"}
                        account={selectedAccount}
                        onBack={() => setCurrentPage("list")}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
