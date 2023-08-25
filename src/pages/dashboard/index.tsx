import { useEffect, useState, useContext } from 'react'
import { Container } from "../../components/container";
import { DashboardHeader } from '../../components/panelheader/index'

import { FiTrash2 } from 'react-icons/fi'

import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { AuthContext } from '../../context/AuthContext'

interface CarProps{
    id:string;
    name: string;
    year: string;
    price: string | number;
    city: string;
    km: string;
    images: ImageCarProps[];
    uid: string;
}

interface ImageCarProps{
    name: string;
    uid: string;
    url: string;
}

export function Dashboard() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {

        function loadCars() {
            if(!user?.uid){
                return;
            }

            const carsRef = collection(db, 'cars')
            const queryRef = query(carsRef, where("uid", "==", user.uid))

            getDocs(queryRef)
                .then((snapshot) => {
                    const listcars = [] as CarProps[];

                    snapshot.forEach(doc => {
                        listcars.push({
                            id: doc.id,
                            name: doc.data().name,
                            year: doc.data().year,
                            km: doc.data().km,
                            city: doc.data().city,
                            price: doc.data().price,
                            images: doc.data().images,
                            uid: doc.data().uid
                        })
                    })

                    setCars(listcars);

                })
        }

        loadCars();

    }, [user])



    return (
        <Container>
            <DashboardHeader />
            <main className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">

                <section className=" w-full bg-white rounded-lg relative">

                    <button
                        onClick={() => { }}
                        className=" absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow">
                        <FiTrash2 size={26} color="#000" />
                    </button>
                    <img
                        className=" w-full rounded-lg mb-2 max-h-70"
                        src="https://firebasestorage.googleapis.com/v0/b/webcarros-6fc29.appspot.com/o/images%2FN6MoXGmAOTRNe1mOGw0n9OcKJRC3%2F3edb1f12-4802-49ac-af65-88ce7e8e8594?alt=media&token=eb7b486c-e3c2-4917-9377-9da2f9ea0d4e"
                    />
                    <p className=" font-bold mt-1 px-2 mb-2">
                        BMW
                    </p>

                    <div className=" flex flex-col px-2">
                        <span className=" text-zinc-700">
                            Ano 2016/2017 | 120.000 KM
                        </span>
                        <strong className=" text-black font-bold mt-4">
                            R$ 150.000
                        </strong>
                    </div>

                    <div className=" w-full h-px bg-slate-200 my-2"></div>
                    <div className=" px-2 pb-2">
                        <span className=" text-black">
                            Lins - SP
                        </span>
                    </div>




                </section>

            </main>


        </Container>
    )
}

