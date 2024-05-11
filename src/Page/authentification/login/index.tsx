import LoginForm from '../../../Component/form/login-form';

function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center font-blinkmacsystem bg-no-repeat bg-cover">
            <div className="w-5/6 min-h-min bg-white shadow-2xl rounded-sm sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 border">
                <div className="h-1 bg-blue-500"></div>
                <LoginForm />
            </div>
        </div >
    );
}
export default Login;
