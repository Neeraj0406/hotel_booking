import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { Logout } from "../api-clients";

const Header = () => {
    const queryClient = useQueryClient()
    const { showToast, isLoggedIn } = useAppContext()

    const mutation = useMutation(Logout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({
                message: "Logout successfully",
                type: "SUCCESS"
            })
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            })
        }
    })

    const handleSignOut = () => {
        mutation.mutate()
        // isLoggedIn = false
    }

    return (
        <div className="bg-blue-800 PY-6">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl py-3 text-white tracking-tighter">
                    <Link to="/asd">Booking.com</Link>
                </span>
                {!isLoggedIn ?
                    <span className="flex space-x-2 ">
                        <Link to="/sign-in" className="flex items-center text-blue-600 p-3 font-bold hover:bg-gray-100 bg-white">Sign In</Link>
                    </span>
                    : <div className="flex items-center gap-3 mt-3 align-middle ">
                        <Link to="/my-bookings" className="text-white font-semibold hover:bg-white hover:text-blue-600 p-2 rounded-md">My Bookings</Link>
                        <Link to="/my-hotels" className="text-white font-semibold hover:bg-white hover:text-blue-600 p-2 rounded-md">My Hotels</Link>
                        <button onClick={handleSignOut} className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500"> Sign Out</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;
