import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex gap-8 justify-center pt-10">
            <Link to={'/'}>Add Class</Link>
            <Link to={'/allClasses'}>All Classes</Link>
        </div>
    );
};

export default Navbar;