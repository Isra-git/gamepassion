import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Juego from "./components/Juego";
import {db} from "./data/db";

function App() {
    
    //Definimos el estado como un arreglo de covers db
    const [data, setData] = useState(db)

    //Definimos un estado para el carrito
    const [cart, setCart] = useState([])

    //Agrega elementos al carrito 
    function addToCart(item){

        //Comprobamos si el elemento existe en el carrito (no existe:-1)
        const itemExists = cart.findIndex((game => game.id === item.id))

        //Si existe, realizamos una copia (el state no se puede mutar), incrementamos la cantidad
        // y lo añadimos al state (cart) original del carro
        if (itemExists >=0) {          
           const updatedCart = [...cart]
           updatedCart[itemExists] = {
             ...updatedCart[itemExists],
            quantity: updatedCart[itemExists].quantity +1
        };
        setCart(updatedCart);
        //    updatedCart[itemExists].quantity++
        //    setCart(updatedCart)
            
        }else{
            const newItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        // //Inicializamos el contador de articulos para el carrito
        // item.quantity = 1
        // //Si no existe lo añadimos
        //  setCart([...cart, item])
         }

}
  return (
    <>

    <Header 
        cart = {cart}
        addToCart = {addToCart}

    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((game)=> {
            return (
                <Juego
                    key = {game.id}
                    game = {game} 
                    cart = {cart}
                    setCart= {setCart}
                    addToCart = {addToCart}
                />
            )
          })}
          
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GamePassion - Tu tienda de Videojuegos retro- Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
