import React, { useId, useState } from "react";
import { useOutletContext } from "react-router";

function readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = () => resolve(fr.result as string);
        fr.onerror = (err) => reject(err);
    });
}

interface IOutletContext {
    authToken?: string;
}

async function submitUpload(_prevState: any, formData: FormData, authToken?: string) {
    try {
        const headers: HeadersInit = {};
        if (authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }

        const response = await fetch("/api/images", {
            method: "POST",
            headers,
            body: formData
        });

        if (!response.ok) {
            return { error: "Failed to upload image. Please try again." };
        }

        return { success: true, message: "Image uploaded successfully!" };
    } catch (error) {
        console.error("Upload error:", error);
        return { error: "Network error. Please check your connection and try again." };
    }
}

export function UploadPage() {
    const fileInputId = useId();
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const { authToken } = useOutletContext<IOutletContext>();
    
    const [state, formAction, isPending] = React.useActionState(
        (prevState: any, formData: FormData) => submitUpload(prevState, formData, authToken),
        null
    );

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const dataUrl = await readAsDataURL(file);
                setPreviewUrl(dataUrl);
            } catch (error) {
                console.error("Error reading file:", error);
                setPreviewUrl("");
            }
        } else {
            setPreviewUrl("");
        }
    }

    return (
        <>
            <h2>Upload</h2>
            <form action={formAction}>
                <div>
                    <label htmlFor={fileInputId}>Choose image to upload: </label>
                    <input
                        id={fileInputId}
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        required
                        onChange={handleFileChange}
                        disabled={isPending}
                    />
                </div>
                <div>
                    <label>
                        <span>Image title: </span>
                        <input name="name" required disabled={isPending} />
                    </label>
                </div>

                <div> {/* Preview img element */}
                    <img style={{width: "20em", maxWidth: "100%"}} src={previewUrl} alt="" />
                </div>

                <input type="submit" value="Confirm upload" disabled={isPending} />
                
                <div aria-live="polite">
                    {state?.success && (
                        <p style={{ color: "green" }}>{state.message}</p>
                    )}
                    {state?.error && (
                        <p style={{ color: "red" }}>{state.error}</p>
                    )}
                    {isPending && <p>Uploading...</p>}
                </div>
            </form>
        </>
    );
}