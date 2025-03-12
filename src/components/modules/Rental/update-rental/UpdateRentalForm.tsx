"use client";
import { Button } from "@/components/ui/button";
import BFImageUploader from "@/components/ui/core/BFImageUploader";
import ImagePreviewer from "@/components/ui/core/BFImageUploader/ImagePreviewer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Districts, Divisions, DivisionType } from "@/constants/address";
import { useUser } from "@/context/UserContext";
import { updateRentalListingByLandlord } from "@/services/Rental";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";

type RentalFormData = {
  _id: string;
  keyFeatures: { value: string }[];

  specification: { key: string; value: string }[];
  holding: string;
  description: string;
  rentAmount: number;
  category: string;
  unitNumber: string;
  division: string;
  district: string;
  postalCode: number | undefined;
  imageUrls: string[];
  upazila: string;
  address: string;
  citycorporation: string;
  bedrooms: number;
  availableFrom?: string;
  // keyFeatures: { value: string }[];
  // specification: { key: string; value: string }[];
};

const UpdateRentalForm = ({ rental }: { rental: RentalFormData }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm<RentalFormData>({
    defaultValues: {
      holding: rental?.holding || "",
      description: rental?.description || "",
      rentAmount: rental?.rentAmount || 0,
      category: rental?.category || "",
      unitNumber: rental?.unitNumber || "",
      division: rental?.division || "",
      district: rental?.district || "",
      upazila: rental?.upazila || "",
      postalCode: rental?.postalCode || 0,
      citycorporation: rental?.citycorporation || "",
      bedrooms: rental?.bedrooms || 0,
      address: rental?.address || "",
      availableFrom: rental?.availableFrom
        ? new Date(rental.availableFrom).toISOString().split("T")[0]
        : "",

      // Fix: Ensure keyFeatures is an array of objects with string values
      keyFeatures: rental?.keyFeatures?.map((feature) => ({
        value: typeof feature === "string" ? feature : feature.value,
      })) || [{ value: "" }],

      // Fix: Ensure specification values are strings
      specification: rental?.specification
        ? Object.entries(rental.specification).map(([key, value]) => ({
            key,
            value: String(value), // Ensure value is a string
          }))
        : [{ key: "", value: "" }],
    },
  });

  React.useEffect(() => {
    if (rental.division) {
      setSelectedDivision(rental.division);
      setDistricts(Districts[rental.division as DivisionType] || []);
    }
  }, [rental.division]);

  //   const { user } = useUser();
  //   console.log(user);

  const {
    formState: { isSubmitting },
  } = form;

  const [districts, setDistricts] = React.useState<string[]>([]);
  const [selectedDivision, setSelectedDivision] = React.useState<string>("");

  const handleDivisionChange = (division: string) => {
    setSelectedDivision(division);
    setDistricts(Districts[division as DivisionType] || []); // Update districts based on the division
  };

  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });

  const addFeatures = () => {
    appendFeatures({ value: "" });
  };
  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  const addSpec = () => {
    appendSpec({ key: "", value: "" });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>User not found. Please log in.</p>;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const keyFeatures = data.keyFeatures.map(
      (feature: { value: string }) => feature.value
    );

    const specification: { [key: string]: string } = {};
    data.specification.forEach(
      (item: { key: string; value: string }) =>
        (specification[item.key] = item.value)
    );

    const modifiedData = {
      ...data,
      //landlordId: user?.userId,
      imageUrls: imagePreview,
      availableFrom: data.availableFrom
        ? new Date(data.availableFrom).toISOString().split("T")[0]
        : null, // Handle invalid dates gracefully
      // Ensure date format
      bedrooms: Number(data.bedrooms) || 1,

      keyFeatures,
      postalCode: Number(data.postalCode) || 0, // Convert to number
      rentAmount: Number(data.rentAmount) || 0, // Convert to number
      specification,
    };

    console.log("Submitting Data before:", modifiedData);

    try {
      const response = await updateRentalListingByLandlord(
        JSON.stringify(modifiedData),
        rental?._id
      );
      console.log("Submitting Data:", modifiedData);

      console.log("Submitting Data after:", response);
      if (response?.success) {
        toast.success(response.message);
        router.push("/landlord/rental/manage-rental");
      } else {
        console.log("Submitting Data after:", response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        {/* <Logo /> */}

        <h1 className="text-xl font-bold">Update Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="holding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Holding</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Unit No</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleDivisionChange(value); // Update districts when division changes
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Divisions.map((division) => (
                        <SelectItem key={division} value={division}>
                          {division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!districts.length} // Disable if no districts are available
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.length ? (
                        districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-district" disabled>
                          No districts available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upazila"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upazila</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="citycorporation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Corporation</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Bedroom</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value || ""}
                      className="input-class"
                    >
                      {" "}
                      {/* Add your input class if needed */}
                      <option value="">Select Category</option>
                      <option value="family">Family</option>
                      <option value="bachelor">Bachelor</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available From</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <BFImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Key Features</p>
              <Button
                onClick={addFeatures}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="my-5">
              {featureFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`keyFeatures.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Specification</p>
              <Button
                onClick={addSpec}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            {specFields.map((specField, index) => (
              <div
                key={specField.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
              >
                <FormField
                  control={form.control}
                  name={`specification.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature name {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specification.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Description {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Update Rental....." : "Update Rental"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateRentalForm;
