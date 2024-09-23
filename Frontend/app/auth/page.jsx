"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Progress, Text } from "@nextui-org/react";
import { useRouter } from 'next/navigation'; // For redirecting

const AuthWelcome = ({ onNext }) => {
    return (
        <div className=''>
            <h1 className="text-6xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg mb-3 -mt-28">
                Agrico
            </h1>
            <div className="flex justify-center space-x-4 text-xl text-white font-sans mb-12">
                <span className="hover:underline cursor-pointer">Visualize</span>
                <span>|</span>
                <span className="hover:underline cursor-pointer">Analyze</span>
                <span>|</span>
                <span className="hover:underline cursor-pointer">Utilize</span>
            </div>
            <h2 className="text-sm text-white font-light leading-relaxed">
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
    const router = useRouter(); // For navigation

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = async () => {
        if ((step === 1 && !formValues.fullName) ||
            (step === 2 && !formValues.email) ||
            (step === 3 && !formValues.phoneNumber)) {
            setWarning('Please fill out the required fields.');
        } else {
            setWarning('');
            if (step === 3) {
                try {
                    const response = await axios.post('https://agricooo.projectdaffodil.xyz/createAccount', formValues);
                    const { accessToken, apiToken } = response.data;

                    // Save credentials in localStorage
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('apiToken', apiToken);

                    // Redirect to the homepage
                    router.push('/');
                } catch (error) {
                    console.error('Error during authentication:', error);
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
            <div className="mx-auto p-6 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 text-center space-y-8">
                {step !== 0 && (
                    <Progress
                        aria-label="Step Progress"
                        size="md"
                        value={progress}
                        color="success"
                        showValueLabel={true}
                        className="mb-6 text-white w-80"
                    />
                )}
                {step === 0 && <AuthWelcome onNext={() => setStep(1)} />}
                {step === 1 && (
                    <>
                        <Input
                            name="fullName"
                            value={formValues.fullName}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                        />
                        {warning && <Text color="error">{warning}</Text>}
                        <div className='mt-4'>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.fullName}>Next</Button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <Input
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                        {warning && <Text color="error">{warning}</Text>}
                        <div className='mt-4'>
                            <Button className='mr-2' onClick={handleBack} color="primary">Back</Button>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.email}>Next</Button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <Input
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            required
                        />
                        {warning && <Text color="error">{warning}</Text>}
                        <div className='mt-4'>
                            <Button className='mr-2' onClick={handleBack} color="primary">Back</Button>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.phoneNumber}>Submit</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StepForm;
