import axios from 'axios';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import {Role} from "../../components/models/role";
import {Redirect} from "react-router-dom";

const UserCreate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('roles');
                setRoles(data);
            }
        )()
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('users', {
            first_name,
            last_name,
            email,
            role_id
        });

        setRedirect(true);
    }
    if(redirect) {
        return <Redirect to="/users" />
    }
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="first_name"
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="last_name"
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email"
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Role</label>
                    <select name="role_id" className="form-control"
                            onChange={e => setRoleId(e.target.value)}
                    >
                        {roles.map(
                            (r: Role) => {
                                return (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                )
                            }
                        )}
                    </select>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default UserCreate;