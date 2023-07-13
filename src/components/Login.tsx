'use client';
import {useRouter} from "next/navigation";

const Login = () => {
    const Router = useRouter();

    const handleSubmit = (e:any) => {
        e.preventDefault();
        Router.push("/Home");
    }

    return (

        <>
            <div className={"min-vh-100 d-flex align-items-center justify-content-center"}>

                <form onSubmit={handleSubmit} className={"shadow-lg rounded px-3 py-3 col-md-4 "} id={"formContainer"}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input name={"user"} type="text" className="form-control" placeholder={"Username"}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name={"password"} type="password" className="form-control"  placeholder={'*************'}/>
                    </div>

                    <div className={"d-flex justify-content-center"}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

            </div>

        </>
    )
}

export default Login;