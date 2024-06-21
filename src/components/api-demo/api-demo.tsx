import { useEffect, useState } from "react";
import { FakestoreContract } from "../../contracts/FakestoreContract";
import axios from "axios";

export function APIDemo()
{
    const [categories, setCategories] = useState<string[]>(['']);
    const [products, setProducts] = useState<FakestoreContract[]>();

    function LoadCategories():void 
    {
        axios.get(`https://fakestoreapi.com/products/categories`)
        .then(response=>{
            response.data.unshift('all');
            setCategories(response.data);
        })
    }

    function LoadProducts(url:string):void
    {
        axios.get(url).then(response=>{
            setProducts(response.data);
        })
    }

    useEffect(()=>{

        LoadCategories();
        LoadProducts(`https://fakestoreapi.com/products`);

    },[])

    function handleCategoryChange(e:any):void 
    {
        if(e.target.value === 'all') {
            LoadProducts(`https://fakestoreapi.com/products`);
        } else {
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
        }
    }

    return(
        <div className="container-fluid">
            <header className="bg-dark text-white p-2">
                <div className="text-center">Fakestore API</div>
            </header>
            <section className="row">
                <nav className="col-2">
                    <label className="form-label fw-bold">Select Category</label>
                    <div>
                        <select className="form-select" onChange={handleCategoryChange}>
                            {
                                categories.map(category => 
                                     <option value={category} key={category}>{category.toUpperCase()}</option>
                                )
                            }
                        </select>
                    </div>
                </nav>
                <main className="col-10 d-flex flex-wrap overflow-auto" style={{height:'500px'}}>
                    {
                        products?.map(product=>
                            <div key={product.id} className="card m-2 p-2" style={{width:'200px'}}>
                                <img src={product.image} className="card-img-top" height='140' />
                                <div className="card-header" style={{height:'150px'}}>
                                    {product.title}
                                </div>
                            </div>

                        )
                    }
                </main>
            </section>
        </div>
    )
}