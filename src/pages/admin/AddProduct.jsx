import { ProductEditForm } from "../../components";
import { Navbar, Footer, LeftNav } from "../../components";

function AddProductPage() {
    return (
        <>
            <div class="row">
                <Navbar />
            </div>
            <div class="row">
                <div class="col-md-3 col-sm-3 col-lg-3">
                    <LeftNav />
                </div>
                <div class="col-md-9 col-sm-9 col-lg-9">
                    <ProductEditForm />
                </div>
            </div>
            <div class="row">
                <Footer />
            </div>

        </>
    )
}

export default AddProductPage