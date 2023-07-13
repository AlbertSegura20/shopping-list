import Image from 'next/image'
// import styles from './page.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import Login from "@/components/Login";

export default function Home() {
  return (
    <main>
      <Login/>
    </main>
  )
}
