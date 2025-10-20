import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const api = {
  getUserDetails: async (token: string) => {
    const response = await fetch("/api/users/details", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  updateUserDetails: async (token: string, updatedData: any) => {
    const response = await fetch("/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    return response.json();
  },
};

type User = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
};

const Profile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await api.getUserDetails(token!);
        if (response.success) {
          setUser(response.data);
          setFormData(response.data);
        } else {
          setError("Failed to fetch user details");
        }
      } catch (err) {
        setError("An error occurred while fetching user details");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUserDetails();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.updateUserDetails(token!, formData);
      if (response.success) {
        setUser(response.data);
        setEditMode(false);
        setSuccess("Profile updated successfully!");
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      setError("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-custom-brown flex items-center justify-center">
        <p className="text-white text-lg">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-custom-brown flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-custom-brown py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>

        {success && (
          <p className="text-green-600 mb-4 font-medium">{success}</p>
        )}

        {user && (
          <div className="space-y-4">
            <div>
              <strong>Email:</strong> {user.email}
            </div>

            {["name", "phone", "address", "city"].map((field) => (
              <div key={field}>
                <label className="font-semibold capitalize">{field}:</label>
                {editMode ? (
                  <input
                    type="text"
                    name={field}
                    value={(formData as any)?.[field] || ""}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                  />
                ) : (
                  <p>{(user as any)?.[field] || "Not provided"}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={onBack}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
