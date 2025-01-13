// app/components/CreateBrandDialog.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Forms
import { brandFormSchema, brandFormDefaultValues } from "@/forms/create-brand";

// Actions
import { createBrandAction, createBrandReturnType } from "@/actions/createBrand";

export const CreateBrandDialog = () => {
  //   Tags
  const [tagInput, setTagInput] = useState("");

  //   Dialog
  const [open, setOpen] = useState(false);

  //   Toast
  const { toast } = useToast();

  //   Set up the form
  const form = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: brandFormDefaultValues,
  });

  //   Set initial state
  const initialState: createBrandReturnType = {
    prevState: null,
    success: false,
    message: "",
    zodErrors: {},
  };

  //   Set up the action state
  const [state, formAction, isPending] = useActionState(createBrandAction, initialState);

  //   Form Handlers
  const { reset, getValues, setValue, setError } = form;

  //   Reset the form
  const resetForm = () => {
    reset(brandFormDefaultValues);
    setTagInput("");
  };

  //   Toast and Error Handling
  useEffect(() => {
    if (state.success) {
      toast({
        title: state.message,
        variant: "default",
      });

      // Reset the form
      resetForm();

      // Close the dialog
      setOpen(false);
    } else {
      // Display form validation errors
      if (state.zodErrors) {
        Object.entries(state.zodErrors).forEach(([field, errors]) => {
          setError(field as keyof z.infer<typeof brandFormSchema>, {
            type: "server",
            message: errors[0],
          });
        });
      }

      if (state.message) {
        toast({
          title: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, setError, toast]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only proceed if Enter is pressed and input is not empty
    if (e.key !== "Enter" || !tagInput.trim()) return;
    
    e.preventDefault();
    
    const trimmedTag = tagInput.trim();
    const currentTags = getValues("createdTags") || [];
    
    // Validate tag length
    if (trimmedTag.length < 2) {
      toast({
        title: "Tag must be at least 2 characters long",
        variant: "destructive"
      });
      return;
    }

    if (trimmedTag.length > 20) {
      toast({
        title: "Tag must be less than 20 characters",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate tags case-insensitively
    const tagExists = currentTags.some(
      (tag) => tag.name.toLowerCase() === trimmedTag.toLowerCase()
    );

    if (tagExists) {
      toast({
        title: "Tag already exists",
        variant: "destructive"
      });
      return;
    }

    // Add new tag
    const newTags = [...currentTags, { name: trimmedTag }];
    setValue("createdTags", newTags, { shouldValidate: true });
    setTagInput("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>Create New Brand</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Brand</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4 p-4" action={formAction}>
            {/* Brand Name and Founder Fields */}
            <div className="grid grid-cols-2 gap-4">
              {/* Brand Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Apple" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Founder */}
              <FormField
                control={form.control}
                name="founder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founder</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Chris Maresca" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter brand description" className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Website URL, LinkedIn Handle, Twitter Handle */}
            <div className="grid grid-cols-3 gap-4">
              {/* Website URL */}
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://www.chrismaresca.dev" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LinkedIn Handle */}
              <FormField
                control={form.control}
                name="linkedInHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="flex items-center gap-2 h-[26px]">
                        LinkedIn Handle
                        <Badge variant="secondary">Optional</Badge>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="chris-maresca" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Twitter Handle */}
              <FormField
                control={form.control}
                name="twitterHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="flex items-center gap-2 h-[26px]">
                        Twitter Handle
                        <Badge variant="secondary">Optional</Badge>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="thechrismaresca" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tags Field */}
            <FormField
              control={form.control}
              name="createdTags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input 
                        value={tagInput} 
                        onChange={(e) => setTagInput(e.target.value)} 
                        onKeyDown={handleAddTag} 
                        placeholder="Type a tag and press Enter" 
                        aria-label="Tag Input" 
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value?.map((tag, index) => (
                          <div key={index}>
                            <Badge
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => {
                                const newTags = field.value.filter((_, i) => i !== index);
                                setValue("createdTags", newTags, { shouldValidate: true });
                              }}
                              aria-label={`Remove tag ${tag.name}`}
                            >
                              {tag.name} ×
                            </Badge>
                            <input type="hidden" name="createdTags" value={tag.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating Brand..." : "Create Brand"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
