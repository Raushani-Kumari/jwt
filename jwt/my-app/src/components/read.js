import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableRow } from 'semantic-ui-react';

/* table structure to be done */
/* table data to be displayed on api call */
export default function Read() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get('https://6735a3dd5995834c8a937d4b.mockapi.io/dummyData').then(
            (response) => {
                setAPIData(response.data);
                console.log(response.data);
            }
        )

    }, [])

    const setData = (data) => {
        console.log(data);
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox);
    }

    // loading data after delete
    const loadData = () => {
        axios.get('https://6735a3dd5995834c8a937d4b.mockapi.io/dummyData').then(
            (getData) => {
                setAPIData(getData.data);
            }
        )
    }
    // delete the id
    // then load the updated data after performing delete operation

    const onDelete = (id) => {
        axios.delete(`https://6735a3dd5995834c8a937d4b.mockapi.io/dummyData/${id}`).then(
            () => loadData()
        )}

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <TableBody>
                    {APIData.map((data) => {
                        return (
                            <TableRow>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'checked' : 'unchecked'}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell><Button onClick={() => setData(data)}>Update</Button></Table.Cell>
                                </Link>
                                <Table.Cell><Button onClick={() => onDelete(data.id)}>Delete</Button></Table.Cell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </div>
    )
}