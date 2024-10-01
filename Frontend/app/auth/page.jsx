"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Progress } from "@nextui-org/react";
import { useRouter } from 'next/navigation'; // For redirecting

const AuthWelcome = ({ onNext }) => {
    return (
        <div className=''>
            <h1 className="text-6xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg mb-3 -mt-28">
                Agrico
            </h1>
            <div className="flex justify-center space-x-4 text-xl text-white font-sans mb-8">
                <span className="hover:underline cursor-pointer">Visualize</span>
                <span>|</span>
                <span className="hover:underline cursor-pointer">Analyze</span>
                <span>|</span>
                <span className="hover:underline cursor-pointer">Utilize</span>
            </div>
            <h2 className="text-sm text-white font-light leading-relaxed w-80 md:w-[500px]">
                Agricooo is a smart farming solution that helps farmers make informed decisions using real-time Earth data and IoT devices. It empowers them to manage crops effectively, tackling challenges like unpredictable weather, pests, and diseases for enhanced productivity.
            </h2>
            
            <Button className='mt-10' onClick={onNext} color="primary">
                Sign Up
            </Button>
        </div>
    );
};

const StepForm = () => {
    const [step, setStep] = useState(0);
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });
    const [warning, setWarning] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // To display API errors
    const router = useRouter(); // For navigation

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = async () => {
        // Check required fields based on step
        if ((step === 1 && !formValues.fullName) ||
            (step === 2 && !formValues.email) ||
            (step === 3 && !formValues.phoneNumber)) {
            setWarning('Please fill out the required fields.');
        } else {
            setWarning('');
            if (step === 3) {
                try {
                    // Submit form on the last step
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/createAccount`, formValues);
                    const { accessToken, apiToken } = response.data;

                    if (accessToken && apiToken) {
                        // Save credentials in localStorage
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('apiToken', apiToken);

                        // Redirect to the homepage
                        router.push('/');
                    } else {
                        throw new Error("Invalid response from server");
                    }
                } catch (error) {
                    console.error('Error during authentication:', error.response ? error.response.data : error.message);
                    setErrorMessage('Failed to authenticate. Please try again.');
                }
            } else {
                setStep(step + 1);
            }
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const progress = (step / 3) * 100; // Adjust the progress calculation

    return (
        <div className='min-h-screen relative z-50 flex flex-col justify-center items-center h-screen overflow-y-scroll'>
            <div className="mx-auto p-6 text-center h-full mt-60">
                {step !== 0 && (
                    <Progress
                        aria-label="Step Progress"
                        size="md"
                        value={progress}
                        color="success"
                        showValueLabel={false}
                        className="mb-6 text-white absolute top-0 left-0 w-full"
                    />
                )}
                {step === 0 && <AuthWelcome onNext={() => setStep(1)} />}
                {step === 1 && (
                    <>
                        <div className='text-white font-medium text-md text-left flex '>Full Name:</div>
                        <Input
                            name="fullName"
                            value={formValues.fullName}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            placeholder="Enter your full name"
                            required 
                            className='w-80 mt-2'
                        />
                        {warning && <p className="text-red-500">{warning}</p>}
                        <div className='mt-4 w-80 flex'>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.fullName}>Next</Button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <span className='text-white font-medium text-md text-left flex'>Email:</span>
                        <Input
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            type="email"
                            placeholder="Enter your email"
                            required
                            className='w-80 mt-2'
                        />
                        {warning && <p className="text-red-500">{warning}</p>}
                        <div className='mt-4 w-80 flex'>
                            <Button className='mr-2' onClick={handleBack} color="primary">Back</Button>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.email}>Next</Button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <span className='text-white font-medium text-md text-left flex'>Phone Number:</span>
                        <Input
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            placeholder="Enter your phone number"
                            required
                            className='w-80 mt-2'
                        />
                        {warning && <p className="text-red-500">{warning}</p>}
                        <div className='mt-4 w-80 flex'>
                            <Button className='mr-2' onClick={handleBack} color="primary">Back</Button>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.phoneNumber}>Submit</Button>
                        </div>
                    </>
                )}
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default StepForm;
