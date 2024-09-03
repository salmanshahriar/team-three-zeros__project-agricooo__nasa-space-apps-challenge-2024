"use client";

import React, { useState } from 'react';
import { Input, Button, Progress, Text } from "@nextui-org/react";

const AuthWelcome = ({ onNext }) => {
    return (
        <>
            <h1 className="text-6xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg">
                Agrico
            </h1>
            <div className="flex justify-center space-x-4 text-xl text-white">
                <span className="hover:underline cursor-pointer">Visualize</span>
                <span>|</span>
                <span className="hover:underline cursor-pointer">Analyze</span>
                <span>|</span>
                <span className="hover:underline cursor-pointer">Utilize</span>
            </div>
            <h2 className="text-lg text-white font-light leading-relaxed">
                Welcome to Agrico, your go-to guide for daily farming tips and an expert agricultural marketplace.
            </h2>
            
            <Button className='mt-10' onClick={onNext} color="primary">
                Sign Up
            </Button>
        </>
    );
};

const StepForm = () => {
    const [step, setStep] = useState(0);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        number: '',
        location: ''
    });
    const [warning, setWarning] = useState('');

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = () => {
        if ((step === 1 && !formValues.name) ||
            (step === 2 && !formValues.email) ||
            (step === 3 && !formValues.number) ||
            (step === 4 && !formValues.location)) {
            setWarning('Please fill out the required fields.');
        } else {
            setWarning('');
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    // Calculate progress as a percentage
    const progress = (step / 4) * 100;

    return (
        <div className='min-h-screen relative z-50 flex flex-col justify-center items-center bg-gradient-to-br from-gray-700 via-indigo-900 to-gray-600'>
            <div className="mx-auto p-6 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 text-center space-y-8">
                {step !== 0 && (
                    <Progress
                        aria-label="Step Progress"
                        size="md"
                        value={progress}
                        color="success"
                        showValueLabel={true}
                        className="mb-6"
                    />
                )}
                {step === 0 && <AuthWelcome onNext={() => setStep(1)} />}
                {step === 1 && (
                    <>
                        <Input
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            label="Name"
                            placeholder="Enter your name"
                            required
                        />
                        {warning && <Text color="error">{warning}</Text>}
                        <div className='mt-4'>
                            <Button className='mr-2' onClick={handleBack} color="primary">Back</Button>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.name}>Next</Button>
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
                            name="number"
                            value={formValues.number}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            label="Number"
                            type="tel"
                            placeholder="Enter your phone number"
                            required
                        />
                        {warning && <Text color="error">{warning}</Text>}
                        <div className='mt-4'>
                            <Button className='mr-2' onClick={handleBack} color="primary">Back</Button>
                            <Button onClick={handleNext} color="primary" disabled={!formValues.number}>Next</Button>
                        </div>
                    </>
                )}
                {step === 4 && (
                    <>
                        <Input
                            name="location"
                            value={formValues.location}
                            onChange={handleChange}
                            clearable
                            fullWidth
                            label="Location"
                            placeholder="Enter your location"
                            required
                        />
                        {warning && <Text color="error">{warning}</Text>}
                        <div className='mt-4'>
                            <Button className='mr-2' onClick={handleBack} color="primary">Back</Button>
                            <Button color="primary" disabled={!formValues.location}>Submit</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StepForm;
