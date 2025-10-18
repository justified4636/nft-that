"use client";

import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { Award, Shield, User } from "lucide-react";
import { useState } from "react";
import { AddAdminForm } from "@/components/AddAdminForm";
import { ContractState } from "@/components/ContractState";
import { MintForm } from "@/components/MintForm";
import { TokenViewer } from "@/components/TokenViewer";
import { useContractState } from "@/hooks/useContractState";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export default function Home() {
  const userAddress = useTonAddress();
  const { isOwner, isAdmin, refetch } = useContractState();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTransactionSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
    // Refetch state after 3 seconds to allow blockchain confirmation
    setTimeout(refetch, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  CertificationNFT
                </h1>
                <p className="text-sm text-gray-500">TON Testnet</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {userAddress && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  {isOwner && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                      <Shield className="w-3 h-3" />
                      Owner
                    </span>
                  )}
                  {isAdmin && !isOwner && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      <User className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                </div>
              )}
              <TonConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Contract State */}
        <div id="contract-state" className="mb-8">
          <ContractState />
        </div>

        {/* Admin Controls */}
        {userAddress && (isAdmin || isOwner) && (
          <div id="admin-dashboard" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              Manage certificates and administrators with full access control
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isAdmin && (
                <div className="animate-in fade-in slide-in-from-left duration-500">
                  <MintForm
                    onSuccess={() =>
                      handleTransactionSuccess(
                        "Certificate minted successfully!",
                      )
                    }
                  />
                </div>
              )}
              {isOwner && (
                <div className="animate-in fade-in slide-in-from-right duration-500 delay-150">
                  <AddAdminForm
                    onSuccess={() =>
                      handleTransactionSuccess("Admin added successfully!")
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Token Viewer */}
        <div id="certificate-explorer" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Certificate Explorer
          </h2>
          <p className="text-gray-600 mb-6">
            Search and verify any certificate by ID to view its details and
            ownership
          </p>
          <TokenViewer />
        </div>

        {/* Connection Notice */}
        {!userAddress && (
          <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl text-center">
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connect your TON wallet to access admin features, mint
              certificates, and manage administrators
            </p>
            <TonConnectButton />
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-600 text-lg">
              Built on TON blockchain for maximum security and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">
                Blockchain Verified
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every certificate is permanently stored on the TON blockchain,
                ensuring complete immutability and authenticity.
              </p>
            </div>

            <div className="group bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4 group-hover:bg-purple-200 transition-colors">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">
                Secure Access Control
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Role-based permissions ensure only authorized administrators can
                mint new certificates.
              </p>
            </div>

            <div className="group bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4 group-hover:bg-green-200 transition-colors">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Student Owned</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Certificates are minted directly to student wallets, giving them
                full ownership and control.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-12 border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  CertificationNFT
                </span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Building the future of digital certificates on the TON
                blockchain. Secure, verifiable, and owned by students.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Contract:</span>
                <code className="text-xs bg-gray-200 px-3 py-1.5 rounded-lg text-gray-800 font-mono">
                  {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-6)}
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#contract-state"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    href="#admin-dashboard"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#certificate-explorer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://docs.ton.org"
                    target="_blank"
                    rel="noopener"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    TON Docs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Developer API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 CertificationNFT. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600 text-sm">TON Testnet</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
