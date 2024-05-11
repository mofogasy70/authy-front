import RegisterForm from "../../Component/form/register-form";
const Register: React.FC = () => {
    return (
        <>
            <div className='flex h-screen items-center justify-center'>
                <div className="bg-white max-w-min min-h-min rounded-sm shadow-2xl font-blinkmacsystem border">
                    <div className="h-1 bg-blue-500"></div>
                    <RegisterForm/>
                </div>
            </div>
        </>
    );
}
export default Register;