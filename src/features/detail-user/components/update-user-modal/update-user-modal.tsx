import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/common/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";

import { useEffect, useState } from "react";
import { Field, FieldError, FieldLabel } from "@/common/components/ui/field";
import { toast } from "sonner";
import type { UpdateUserModalProps } from "./update-user-modal.types";
import { UpdateUserDialog } from "../update-user-dialog/update-user-dialog";
import { useUpdateUserMutation } from "@/common/api/users-api";

const formSchema = z.object({
  firstname: z.string().trim().min(1, "Firstname is required.").max(32, "Firstname must be at most 32 characters."),
  lastname: z.string().trim().min(1, "Lastname is required.").max(32, "Lastname must be at most 32 characters."),
  email: z.string().trim().min(1, "Email is required.").email("Invalid email address."),
  skills: z.array(z.string().min(1, "Skill is required.")).min(1, "At least one skill is required."),
});

export const UpdateUserModal = ({ user, isOpen, onClose }: UpdateUserModalProps) => {
  const [updateUser] = useUpdateUserMutation();
  
  const [skillInput, setSkillInput] = useState("");
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      skills: [],
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
      email: user.email ?? "",
      skills: user.skills ?? [],
    });
  }, [form, user]);

  const handleClose = (needRefresh?: boolean) => {
    onClose(needRefresh);
    form.reset();
  };

  const handleCloseUpdateUserDialog = () => {
    setIsUpdateUserDialogOpen(false);
  };

  const handleSubmit = async () => {
    setIsUpdateUserDialogOpen(true);
  };

  const handleErrorSubmit = async () => {
    toast.error("Failed to update user.");
    handleClose(false)
  };

  const handleConfirm = async () => {
    const response = await updateUser({
      id: user.id,
      body: {
        firstName: form.getValues("firstname"),
        lastName: form.getValues("lastname"),
        email: form.getValues("email"),
        skills: form.getValues("skills"),
        createdAt: user.createdAt,
      },
    });

    if (!response.data) {
      toast.error("Failed to update user.");
      return;
    }

    toast.success("User updated successfully.");
    onClose(true);
    setIsUpdateUserDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Update user</DialogTitle>
            <DialogDescription>You can update user manually here</DialogDescription>
          </DialogHeader>
          <form id="update-user-form" onSubmit={form.handleSubmit(handleSubmit, handleErrorSubmit)}>
            <div className="grid gap-4">
              <Controller
                name="firstname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firstname">Firstname</FieldLabel>
                    <Input
                      {...field}
                      id="firstname"
                      placeholder="John"
                      {...form.register("firstname", {
                        required: "firstname is required.",
                      })}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="lastname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastname">Lastname</FieldLabel>
                    <Input
                      {...field}
                      id="lastname"
                      placeholder="Smith"
                      {...form.register("lastname", {
                        required: "lastname is required.",
                      })}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="john@example.com"
                      {...form.register("email", {
                        required: "email is required.",
                      })}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="skills"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="skills">Skills</FieldLabel>

                    <Input
                      {...field}
                      id="skills"
                      placeholder="Enter the skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();

                          const value = skillInput.trim();
                          if (!value) return;

                          const current = form.getValues("skills");
                          if (current.includes(value)) return;

                          form.setValue("skills", [...current, value], {
                            shouldValidate: true,
                          });

                          setSkillInput("");
                        }
                      }}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      {form.watch("skills").map((skill) => (
                        <div key={skill} className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
                          {skill}
                          <button
                            type="button"
                            onClick={() =>
                              form.setValue(
                                "skills",
                                form.getValues("skills").filter((s) => s !== skill),
                                { shouldValidate: true },
                              )
                            }
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </Field>
                )}
              />
            </div>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="update-user-form" disabled={form.formState.isSubmitting}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <UpdateUserDialog
        onConfirm={handleConfirm}
        isOpen={isUpdateUserDialogOpen}
        onClose={handleCloseUpdateUserDialog}
      />
    </>
  );
};
