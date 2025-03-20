import { useUser } from "@/context/userContext";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NewProfilePicModel = () => {

    const { user, setUser } = useUser()

    // define the state 
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // handle select image
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // convert image to base64
    const convertImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // send base64 image to user profile 
    const handleSubmit = async () => {
        // if the image is selected
        if (selectedImage) {
            try {
                // convert the image to base64
                const imageBase64 = await convertImageToBase64(selectedImage);

                // send the base64 image to user profile
                const response = await axios.put("/api/user", {
                    email: user?.email!,
                    updateKey: "imgUrl",
                    keyValue: imageBase64
                });
                
                // if the image is updated successfully
                if (response.data.status === 200) {
                    // show the success message and update the user
                    toast.success(response.data.message);
                    setUser(response.data.UUser);
                } else {
                    // show the error message
                    toast.error(response.data.message);
                }

            } catch (error) {
                // show the error message
                console.error(error);
                toast.error(error as string);
            }
            } else {
            // show the error message
            toast.error("No image selected Image");
        }
    };

    // return the new profile pic modal
    return (
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Alterar Foto de Perfil</h3>
                <p className="py-4">Selecione uma nova imagem para o seu perfil.</p>
                <form method="dialog" className="relative">
                    <div className="flex flex-col items-center gap-4">
                        {imagePreview && (
                            <div className="w-32 h-32 rounded-full overflow-hidden">
                                <img
                                    src={imagePreview}
                                    alt="imagePreview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        />
                    </div>
                    <div className="modal-action">
                        <button className="btn">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default NewProfilePicModel;