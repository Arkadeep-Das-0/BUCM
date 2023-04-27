        import React, { useState } from 'react';
        import { useNavigate } from 'react-router-dom';

        const Register = () => {
        const [name, setName] = useState('');
        const [gsuit, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirm_password, setConfirmPassword] = useState('');

        const history = useNavigate();

        const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, gsuit, password, confirm_password);

        try {
            const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, gsuit, password, confirm_password }),
            });
        
            const data = await response.json();
            console.log(data);
        
            // redirect to login page after successful registration
            if (response.status === 200) {
            history.push('/login');
            }
        } catch (error) {
            console.error(error);
        }
        };

        return (
        <>
        <section className='register'>
        <div className='container mt-5'>
        <div className='register-content'>
        <div className='register-form'>
        <h2 className='form-title'>Register</h2>
        <form
                    method='POST'
                    className='register-form'
                    id='register-form'
                    onSubmit={handleSubmit}
                >
        <div className='form-group'>
        <label htmlFor='name'>
        <i className='zmdi zmdi-account materia-icons-name'></i>
        </label>
        <input
                type='text'
                name='name'
                id='name'
                autoComplete='off'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
        </div>
        <div className='form-group'>
        <label htmlFor='email'>
        <i className='zmdi zmdi-email'></i>
        </label>
        <input
                type='email'
                name='email'
                id='email'
                autoComplete='off'
                placeholder='Email'
                value={gsuit}
                onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='form-group'>
        <label htmlFor='password'>
        <i className='zmdi zmdi-lock'></i>
        </label>
        <input
        type='password'
        name='password'
        id='password'
        autoComplete='off'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className='form-group'>
        <label htmlFor='confirmPassword'>
        <i className='zmdi zmdi-lock-outline'></i>
        </label>
        <input
        type='password'
        name='confirmPassword'
        id='confirmPassword'
        autoComplete='off'
        placeholder='Confirm Password'
        value={confirm_password}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        </div>
        <div className='form-group form-button'>
        <button type='submit' className='btn btn-primary' value={confirm_password} onClick={handleSubmit}>
        Register
        </button>
        </div>
        </form>
        </div>
        </div>
        </div>
        </section>
        </>
        );
        };

        export default Register;



