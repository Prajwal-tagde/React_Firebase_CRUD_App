import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { fireDb } from "../../firebase/Firebase";

const MyState = (props) => {

    const [products, setProducts] = useState({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    })

 // Add Product Function
    const addProduct = async () => {
        // validation
        if (products.title == "" || products.price == "" || products.imageUrl == "" || products.description == "" || products.category == "") 
        {
            return alert('all fields are required');
        }

        // product reference
        const productRef = collection(fireDb, 'products');

        try {
            await addDoc(productRef, products);
            getProducts();
            alert('Product Added Successfully');

            setTimeout(() => {
                window.location.href = "/";
            }, 800);

            setProducts("");
        } catch (error) {
            console.log(error);
        }
    }

    const [allProducts, setAllProducts] = useState([]);
    // get Product function
    const getProducts = async () => {
        try {
            const q = query(
                collection(fireDb, 'products'),
                orderBy('time')
            )
            
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];

                QuerySnapshot.forEach((doc) => {
                    productArray.push({...doc.data(), id: doc.id})
                })

                setAllProducts(productArray);
            })

            return () => data;

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    // Edit Product Function
    const editProductHandle = (item) => {
        setProducts(item);
    }

    // edit handle function
    const editProduct = async () => {
        try {
            await setDoc(doc(fireDb, 'products', products.id), products);
            getProducts();

            alert('Product Updated Successfully');
            setTimeout(() => {
                window.location.href = '/';
            }, 800);
            
            setProducts("");

        } catch (error) {
            console.log(error);
        }
    }

    // delete handle function
    const deleteProduct = async (item) => {
        try {
            await deleteDoc(doc(fireDb, 'products', item.id));
            getProducts();
            alert('Product deleted successfully');
            
        } catch (error) {
            console.log(error);
        }
    }

    const [search, setSearch] = useState("");


    return (
        <MyContext.Provider value={{ products, setProducts, addProduct, allProducts, editProductHandle, editProduct, deleteProduct, search, setSearch }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState;