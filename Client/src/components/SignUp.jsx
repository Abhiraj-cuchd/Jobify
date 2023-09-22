import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CustomButton, TextInput } from "../components/index";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let from = location.state?.from?.pathname || "/";

  const closeModal = () => setOpen(false);

  const onSubmit = () => { };
  return (
    <Transition appear show={open || false}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25"></div>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-600"
                >
                  {isRegister ? "Create Account" : "Account Sign In"}
                </Dialog.Title>
                <div className="w-full flex items-center justify-center py-4">
                  <button
                    className={`flex-1 px-4 py-2 mr-3 rounded text-sm outline-none ${accountType === "seeker"
                        ? "bg-[#1d4fd862] text=blue-900 font-semibold "
                        : "bg-white border border-blue-400"
                      }`}
                    onClick={() => setAccountType("seeker")}
                  >
                    User Account
                  </button>
                  <button
                    className={`flex-1 px-4 py-2 rounded text-sm outline-none ${accountType !== "seeker"
                        ? "bg-[#1d4fd862] text=blue-900 font-semibold "
                        : "bg-white border border-blue-400"
                      }`}
                    onClick={() => setAccountType("company")}
                  >
                    Company Account
                  </button>
                </div>

                <form
                  className="w-full flex flex-col gap-5"
                  onSubmit={onSubmit}
                >
                  <TextInput
                    name="email"
                    label="Email"
                    placeholder="email@example.com"
                    type="email"
                    register={register("email", {
                      required: "Email Address is required",
                    })}
                    error={errors.email ? errors.email.message : ""}
                  />
                  {isRegister && (
                    <div className="w-full flex gap-1 md:gap-2">
                      <div
                        className={`${accountType === "seeker" ? "w-1/2" : "w-full"
                          }`}
                      >
                        <TextInput
                          name={accountType === "seeker" ? "firstName" : "name"}
                          label={
                            accountType === "seeker"
                              ? "First Name"
                              : "Company Name"
                          }
                          placeholder={
                            accountType === "seeker"
                              ? "John"
                              : "Company Pvt Ltd."
                          }
                          type="text"
                          register={register("firstName", {
                            required: "First Name is required",
                          })}
                          error={
                            errors.firstName ? errors.firstName.message : ""
                          }
                        />
                      </div>
                      {accountType === "seeker" && (
                        <div
                          className={`${accountType === "seeker" ? "w-1/2" : "w-full"
                            }`}
                        >
                          <TextInput
                            name={
                              accountType === "seeker" ? "lastName" : "name"
                            }
                            label="Last Name"
                            placeholder="Doe"
                            type="text"
                            register={register("lastName", {
                              required: "Last Name is required",
                            })}
                            error={
                              errors.lastName ? errors.lastName.message : ""
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {isRegister && (
                    <div className="w-full flex gap-1 md:gap-2">
                      <div className="w-1/2">
                        <TextInput
                          name="password"
                          label="Password"
                          type="password"
                          register={register("password", {
                            required: "Password is required",
                          })}
                          error={errors.password ? errors.password.message : ""}
                        />
                      </div>

                      <div className="w-1/2">
                        <TextInput
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          register={register("confirmPassword", {
                            required: "Last Name is required",
                          })}
                          error={
                            errors.confirmPassword
                              ? errors.confirmPassword.message
                              : ""
                          }
                        />
                      </div>
                    </div>
                  )}

                  {errMsg && (
                    <span role="alert" className="text-sm text-red-500 mt-0.5">
                      {errMsg}
                    </span>
                  )}
                  <div className="mt-2">
                    <CustomButton
                      title={isRegister ? "Create Account" : "Login Account"}
                      type="submit"
                      containerStyles={`inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800`}
                    />
                  </div>
                </form>

                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    {isRegister
                      ? "Already have an Account?"
                      : "Do not have an Account"}
                    <span
                      className="text-sm text-blue-600 mml-2 hover:text-blue-700 hover:font-semibold cursor-pointer"
                      onClick={() => setIsRegister((prev) => !prev)}
                    >
                      {isRegister ? "Login" : "Create Account"}
                    </span>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
          </div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
      </Dialog>
    </Transition>
  );
};

export default SignUp;
