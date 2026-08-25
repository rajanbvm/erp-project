import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import {
    getCurrentUser,
    updateUserProfile,
    changeUserPassword,
    logoutUser,
} from "@/utils/rolesPermissionsStorage";

import eyeClose from "@/images/EyeClose.svg";
import eyeOpen from "@/images/eyeOpen.svg";

import DP from "@/images/Dp.png";

const Profile = () => {
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });

   const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
});

const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

const [showNewPassword, setShowNewPassword] =
    useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

const [passwordErrors, setPasswordErrors] =
    useState({});

const [passwordSuccessMessage, setPasswordSuccessMessage] =
    useState("");

    const [profileImage, setProfileImage] = useState(DP);

    const [errors, setErrors] = useState({});

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadUser = () => {
            const user = getCurrentUser();

            if (!user?.isLoggedIn) {
                router.push("/");
                return;
            }

            setCurrentUser(user);

            setFormData({
                name: user?.name || "",
                email: user?.email || "",
                role: user?.role || "",
            });

            setProfileImage(
                user?.profileImage || DP
            );
        };

        loadUser();

        const handleProfileUpdated = () => {
            loadUser();
        };

        window.addEventListener(
            "profileUpdated",
            handleProfileUpdated
        );

        return () => {
            window.removeEventListener(
                "profileUpdated",
                handleProfileUpdated
            );
        };
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setSuccessMessage("");
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setPasswordErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setPasswordSuccessMessage("");
    };

    const toggleCurrentPassword = () => {
    setShowCurrentPassword(
        (prev) => !prev
    );
};

const toggleNewPassword = () => {
    setShowNewPassword(
        (prev) => !prev
    );
};

const toggleConfirmPassword = () => {
    setShowConfirmPassword(
        (prev) => !prev
    );
};

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!passwordData?.currentPassword) {
            newErrors.currentPassword =
                "Current password is required.";
        }

        if (!passwordData?.newPassword) {
            newErrors.newPassword =
                "New password is required.";
        } else if (passwordData?.newPassword?.length < 6) {
            newErrors.newPassword =
                "Password must be at least 6 characters.";
        }

        if (!passwordData?.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password.";
        } else if (
            passwordData?.newPassword !==
            passwordData?.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";
        }

        if (Object.keys(newErrors).length > 0) {
            setPasswordErrors(newErrors);
            return;
        }

        const result = changeUserPassword(
            currentUser?.id,
            passwordData?.currentPassword,
            passwordData?.newPassword
        );

        if (!result?.success) {
            setPasswordErrors({
                currentPassword: result?.message,
            });

            return;
        }

        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        setPasswordErrors({});

        setPasswordSuccessMessage(
            "Password changed successfully. Please login again."
        );

        setTimeout(() => {
            logoutUser();
            router.push("/");
        }, 1500);
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file || !currentUser?.id) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            const imageData = reader.result;

            const updated = updateUserProfile(
                currentUser?.id,
                {
                    profileImage: imageData,
                }
            );

            if (updated) {
                setProfileImage(imageData);

                setCurrentUser((prev) => ({
                    ...prev,
                    profileImage: imageData,
                }));

                window.dispatchEvent(
                    new Event("profileUpdated")
                );
            }
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData?.name?.trim()) {
            newErrors.name =
                "Full name is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updated = updateUserProfile(
            currentUser?.id,
            {
                name: formData?.name?.trim(),
            }
        );

        if (updated) {
            const updatedUser = {
                ...currentUser,
                name: formData?.name?.trim(),
            };

            setCurrentUser(updatedUser);

            localStorage?.setItem(
                "currentUser",
                JSON.stringify(updatedUser)
            );

            setSuccessMessage(
                "Profile updated successfully."
            );

            setErrors({});

            window.dispatchEvent(
                new Event("profileUpdated")
            );
        }
    };

    const roleLabel = {
        admin: "Admin",
        manager: "Manager",
        salesRep: "Sales Representative",
    };

    if (!currentUser) {
        return null;
    }

    return (
        <div className="row tabs-row">
            <div className="col-12">
                <div className="user-profile-change">
                    <Image
                        id="profilePreview"
                        src={profileImage}
                        alt="Profile"
                        width={110}
                        height={110}
                    />

                    <div className="user-profile-dt">
                        <div className="mb-3">
                            <h5 className="profile-namePage">
                                {currentUser?.name}
                            </h5>

                            <p>
                                {currentUser?.email}
                            </p>
                        </div>

                        <label
                            htmlFor="updateDp"
                            className="btn btn-primary"
                        >
                            <input
                                type="file"
                                className="d-none"
                                id="updateDp"
                                accept="image/*"
                                onChange={
                                    handleProfileImageChange
                                }
                            />

                            <div className="editIcon">
                                Upload Profile
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="bg-box">
                    <div className="form-outer mb-3">
                        <form
                            className="row"
                            onSubmit={handleSubmit}
                        >
                            <h3 className="form-title">
                                Personal Information
                            </h3>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors?.name
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={
                                            formData?.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    {errors?.name && (
                                        <div className="form-error">
                                            {
                                                errors?.name
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Email
                                    </label>

                                    <div className="input-text-box">
                                        {formData?.email}
                                    </div>
                                </div>
                            </div>

                            <div className="form-footer">
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="form-outer">
                        <form
                            className="row"
                            onSubmit={handlePasswordSubmit}
                        >
                            <h3 className="form-title">
                                Update Password
                            </h3>

                            <div className="col-lg-6">
                                <div className="form-group pwd">
    <label htmlFor="currentPassword">
        Current Password
    </label>

    <input
        id="currentPassword"
        type={
            showCurrentPassword
                ? "text"
                : "password"
        }
        className={`form-control pwd-input ${
            passwordErrors?.currentPassword
                ? "is-invalid"
                : ""
        }`}
        placeholder="Enter your current password"
        name="currentPassword"
        value={passwordData?.currentPassword}
        onChange={handlePasswordChange}
    />

    <span
        className="eye-btn"
        onClick={toggleCurrentPassword}
    >
        <Image
            src={
                showCurrentPassword
                    ? eyeClose
                    : eyeOpen
            }
            alt="Toggle Password"
            width={20}
            height={20}
        />
    </span>

    {passwordErrors?.currentPassword && (
        <div className="form-error">
            {passwordErrors?.currentPassword}
        </div>
    )}
</div>
                            </div>

                            <div className="col-lg-6">
                               <div className="form-group pwd">
    <label htmlFor="newPassword">
        New Password
    </label>

    <input
        id="newPassword"
        type={
            showNewPassword
                ? "text"
                : "password"
        }
        className={`form-control pwd-input ${
            passwordErrors?.newPassword
                ? "is-invalid"
                : ""
        }`}
        placeholder="Enter your new password"
        name="newPassword"
        value={passwordData?.newPassword}
        onChange={handlePasswordChange}
    />

    <span
        className="eye-btn"
        onClick={toggleNewPassword}
    >
        <Image
            src={
                showNewPassword
                    ? eyeClose
                    : eyeOpen
            }
            alt="Toggle Password"
            width={20}
            height={20}
        />
    </span>

    {passwordErrors?.newPassword && (
        <div className="form-error">
            {passwordErrors?.newPassword}
        </div>
    )}
</div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group pwd">
    <label htmlFor="confirmPassword">
        Confirm Password
    </label>

    <input
        id="confirmPassword"
        type={
            showConfirmPassword
                ? "text"
                : "password"
        }
        className={`form-control pwd-input ${
            passwordErrors?.confirmPassword
                ? "is-invalid"
                : ""
        }`}
        placeholder="Confirm your new password"
        name="confirmPassword"
        value={passwordData?.confirmPassword}
        onChange={handlePasswordChange}
    />

    <span
        className="eye-btn"
        onClick={toggleConfirmPassword}
    >
        <Image
            src={
                showConfirmPassword
                    ? eyeClose
                    : eyeOpen
            }
            alt="Toggle Password"
            width={20}
            height={20}
        />
    </span>

    {passwordErrors?.confirmPassword && (
        <div className="form-error">
            {passwordErrors?.confirmPassword}
        </div>
    )}
</div>
                            </div>

                            {passwordSuccessMessage && (
                                <div className="alert alert-success mt-3">
                                    {passwordSuccessMessage}
                                </div>
                            )}

                            <div className="form-footer">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                    {successMessage && (
                        <div className="alert alert-success mt-3">
                            {successMessage}
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default Profile;