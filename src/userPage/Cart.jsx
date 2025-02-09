import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const api_base = import.meta.env.VITE_BASE_URL;
const api_url = import.meta.env.VITE_API_PATH;

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [carts, setCarts] = useState([]);

  const getCart = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${api_base}/api/${api_url}/cart`);
      setCarts(res.data.data.carts);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-overlay">
          <ReactLoading
            type="spokes"
            color="#ffc107"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" width="33%">
                  品名
                </th>
                <th scope="col" width="33%">
                  數量/單位
                </th>
                <th scope="col" width="33%">
                  單價
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.title}</td>
                  <td>
                    {item.qty}/{item.product.unit}
                  </td>
                  <td>{item.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
