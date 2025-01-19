import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const Items = () => {
  const [itemAll, setItemAll] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/items`)
      .then(res => setItemAll(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>All items</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {itemAll.map(item => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={item.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/item/details/${item._id}`}
                  className="btn btn-primary"
                >
                  See details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
