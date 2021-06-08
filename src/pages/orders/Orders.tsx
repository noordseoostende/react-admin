import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Paginator from "../../components/Paginator";
import axios from 'axios';
import {Order} from "../../components/models/order";
import {OrderItem} from "../../components/models/order-item";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`orders?page=${page}`);

                setOrders(data.data);
                setLastPage(data.meta.last_page);
            }
        )();
    }, [page]);
    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((o: Order) => {
                        return (
                            <>
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.name}</td>
                                <td>{o.email}</td>
                                <td>{o.total}</td>
                                <td><a href="" className="btn-sm btn-outline-secondary" >View</a></td>
                            </tr>
                            <tr>
                              <td colSpan={5}>
                                  <div>
                                      <table className="table table-sm">
                                        <thead>
                                          <tr>
                                              <th>#</th>
                                              <th>Product Title</th>
                                              <th>Quantity</th>
                                              <th>Price</th>
                                          </tr>
                                        </thead>
                                          <tbody>
                                          {o.order_items.map((i: OrderItem) => {
                                              return (
                                                  <tr>
                                                      <td>{i.id}</td>
                                                      <td>{i.product_title}</td>
                                                      <td>{i.quantity}</td>
                                                      <td>{i.price}</td>
                                                  </tr>
                                              )
                                          })}
                                          </tbody>
                                      </table>
                                  </div>

                              </td>
                            </tr>
                        </>
                        )
                    })}


                    </tbody>
                </table>
            </div>
            <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
        </Wrapper>
    );
};

export default Orders;