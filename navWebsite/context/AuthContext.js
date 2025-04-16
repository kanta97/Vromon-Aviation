import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_AUTH_URL } from '../config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)
    const [profileData, setProfileData] = useState(null)

    const router = useRouter()

    useEffect(() => checkUserLoggedIn(), [])

    // Register user
    const register = async (user) => {
        const res = await fetch(`${API_AUTH_URL}/auth/user/profile`, {
            method: 'POST',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()

        if (res.ok) {
            if (data.status) {
                setMsg(data.body)
                router.push('/login')
            } else {
                setError(data.body)
                // setError(null)
            }
        } else {
            setError(data.message)
        }
    }

    // Login user
    const login = async (credentials) => {
        const res = await fetch(`${API_AUTH_URL}/auth/user/login`, {
            method: 'POST',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await res.json()

        if (res.ok) {
            if (data.success) {
                setUser(data)
                localStorage.setItem('userInfo', JSON.stringify(data))
                if (router.query.redirectUrl) {
                    router.push('/' + router.query.redirectUrl)
                } else {
                    router.push('/')
                }
            } else {
                setMsg(data.message)
                console.log(data)
            }
        } else {
            setError(data)
        }
    }

    const getProfileInfo = async () => {
        try{
        const res = await fetch(
            `${API_AUTH_URL}/auth/user/profile/${JSON.parse(localStorage.getItem('userInfo')).userId
            }`,
            {
                method: 'GET',
                headers: {
                    APP_KEY: '123456',
                    'Content-Type': 'application/json'
                }
            }
        )

        const data = await res.json()
        setProfileData(data.body.data[0])}
        
        catch (error) {
            console.error('Error setting user data:', error);
        }
    }

    
    useEffect(() => {
        getProfileInfo();  // Fetch profile when the component loads
    }, []);
    
    console.log("Profile Data:", profileData);  // Debugging

    const updateProfile = async (reqBody) => {
        const res = await fetch(
            `${API_AUTH_URL}/auth/user/profile/${JSON.parse(localStorage.getItem('userInfo')).userId
            }`,
            {
                method: 'PUT',
                headers: {
                    APP_KEY: '123456',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    display_name: reqBody.display_name,
                    gender: reqBody.gender,
                    bloodGroup: reqBody.bloodGroup,
                    nationality: reqBody.nationality,
                    email: reqBody.email,
                    phone_no: reqBody.phone_no,
                    date_of_birth: reqBody.date_of_birth,
                    passport: reqBody.passport,
                    nid: reqBody.nid,
                    Profession: reqBody.Profession,
                    presentAddress: reqBody.presentAddress,
                    parmanentAddress: reqBody.parmanentAddress
                })
            }
        )

        const data = await res.json()
        alert('Successful')
    }

    const get_otp = async (credentials) => {
        const res = await fetch(`${API_AUTH_URL}/auth/forgot/get-otp`, {
            method: 'POST',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await res.json()
        if (res.ok) {
            if (data.success) {
                router.push('/otp')
                localStorage.setItem(
                    'emailOrPhone',
                    JSON.stringify(credentials.emailOrPhone)
                )
            } else {
                setMsg(data.message)
                setTimeout(() => {
                    setMsg('')
                }, 2000)
            }
        } else {
            setError(data)
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }
    const match_otp = async (credentials) => {
        const res = await fetch(`${API_AUTH_URL}/auth/forgot/match-otp`, {
            method: 'POST',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await res.json()

        if (res.ok) {
            if (data.success) {
                router.push('/resetPassword')
                localStorage.setItem('user_token', JSON.stringify(data.message))
            } else {
                setMsg(data.message)
                setTimeout(() => {
                    setMsg('')
                }, 2000)
            }
        } else {
            setError(data)
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

    const verification = async (credentials) => {
        const res = await fetch(
            `${API_AUTH_URL}/auth/user/verification/${credentials.token}`,
            {
                method: 'GET',
                headers: {
                    APP_KEY: '123456',
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = await res.json()
        console.log(data.body.msg)
        if (res.ok) {
            if (data.success) {
                router.push('/login')
                setMsg(data.message)
                setTimeout(() => {
                    setMsg('')
                }, 2000)
            } else {
                setMsg(data.message)
                setTimeout(() => {
                    setMsg('')
                }, 2000)
            }
        } else {
            setError(data)
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

    const reset_pass = async (credentials) => {
        const res = await fetch(`${API_AUTH_URL}/auth/forgot/reset-pass`, {
            method: 'POST',
            headers: {
                APP_KEY: '123456',
                'Content-Type': 'application/json',
                auth_token: credentials.auth_token
            },
            body: JSON.stringify(credentials)
        })
        const data = await res.json()
        if (res.ok) {
            if (data.success) {
                router.push('/login')
            } else {
                setMsg(data.message)
                setTimeout(() => {
                    setMsg('')
                }, 2000)
            }
        } else {
            setError(data)

            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }
    // Logout user
    const logout = async () => {
        // const res = await fetch(`${API_AUTH_URL}/api/logout`, {
        //     method: 'POST'
        // })
        // if (res.ok) {
        //     setUser(null)
        //     router.push('/')
        // }
        localStorage.setItem('userInfo', null)
        setUser(null)
        router.push('/')
    }

    // Check if user is logged in
    const checkUserLoggedIn = (user) => {
        const userInfoFromStorage = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
        if (userInfoFromStorage) {
            setUser(userInfoFromStorage)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                msg,
                user,
                error,
                register,
                login,
                logout,
                get_otp,
                match_otp,
                reset_pass,
                verification,
                getProfileInfo,
                profileData,
                updateProfile
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
