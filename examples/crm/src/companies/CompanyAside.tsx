import * as React from 'react';
import {
    TextField,
    DateField,
    FunctionField,
    ReferenceField,
    EditButton,
    ShowButton,
    useRecordContext,
} from 'react-admin';
import { Box, Typography, Divider, Link, Stack } from '@mui/material';

import { Company, Sale } from '../types';

interface CompanyAsideProps {
    link?: string;
}

export const CompanyAside = ({ link = 'edit' }: CompanyAsideProps) => {
    const record = useRecordContext<Company>();
    if (!record) return null;
    return (
        <Box ml={4} width={250} minWidth={250}>
            <Box mb={2} ml="-5px">
                {link === 'edit' ? (
                    <EditButton label="Edit Company" />
                ) : (
                    <ShowButton label="Show Company" />
                )}
            </Box>

            <Typography variant="subtitle2">Company info</Typography>
            <Divider />

            <Box mt={2}>
                <Typography variant="body2">
                    {record.website && (
                        <>
                            Website:{' '}
                            <Link href={record.website}>{record.website}</Link>
                        </>
                    )}
                    {record.linkedIn && (
                        <>
                            <br />
                            LinkedIn:{' '}
                            <Link href={record.linkedIn}>LinkedIn</Link>
                        </>
                    )}
                </Typography>
            </Box>

            <Box mt={1}>
                <TextField source="phone_number" />{' '}
            </Box>

            {record.revenue || record.identifier || record.country ? (
                <Stack mt={1}>
                    {record.revenue && (
                        <Typography component="span" variant="body2">
                            Revenue: <TextField source="revenue" />
                        </Typography>
                    )}

                    {record.taxe_identifier && (
                        <Typography component="span" variant="body2">
                            Taxe identifier:{' '}
                            <TextField source="taxe_identifier" />
                        </Typography>
                    )}
                    {record.country && (
                        <Typography component="span" variant="body2">
                            Country: <TextField source="country" />
                        </Typography>
                    )}
                </Stack>
            ) : null}

            <Stack mt={1} mb={3}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                >
                    Main Address
                </Typography>
                <TextField source="address" />
                <TextField source="city" /> <TextField source="zipcode" />{' '}
                <TextField source="stateAbbr" />
            </Stack>

            <Typography variant="subtitle2">Background</Typography>
            <Divider />

            <Box mt={1}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                >
                    Added on
                </Typography>{' '}
                <DateField
                    source="created_at"
                    options={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    color="textSecondary"
                />
                <br />
                <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                >
                    Followed by
                </Typography>{' '}
                <ReferenceField source="sales_id" reference="sales">
                    <FunctionField<Sale>
                        source="last_name"
                        render={record =>
                            `${record.first_name} ${record.last_name}`
                        }
                    />
                </ReferenceField>
            </Box>
        </Box>
    );
};
