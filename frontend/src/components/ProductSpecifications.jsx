import React from 'react'

const ProductSpecifications = () => {
    return (
        <>
            <h1 className='supramax-h1'>Product Specification</h1>
            <div className='specifications'>

                    <table>
                        <tr>
                            <th>Category</th>
                            <td>6A</td>
                        </tr>
                        <tr>
                            <th>Cable Type</th>
                            <td>S/FTP (Shielded)</td>
                        </tr>
                        <tr>
                            <th>Conductor</th>
                            <td>23AWG, Solid Bare Copper</td>
                        </tr>
                        <tr>
                            <th>Insulation</th>
                            <td>Foamed PE</td>
                        </tr>
                        <tr>
                            <th>Pairs Quantity</th>
                            <td>4</td>
                        </tr>
                        <tr>
                            <th>Outer Sheath</th>
                            <td>CM, CMR, LSZH, PE, PVC</td>
                        </tr>
                        <tr>
                            <th>Outer Diameter</th>
                            <td>8.0 ± 0.3mm</td>
                        </tr>
                        <tr>
                            <th>Operating Temperature Range</th>
                            <td>-20°C ~ 60°C</td>
                        </tr>
                        <tr>
                            <th>Standard Compliance</th>
                            <td>
                                ISO/IEC 11801<br />
                                ANSI/TIA/EIA-568.2-D<br />
                                IEC 61156-5<br />
                                EN 50399<br />
                                EN 50173-1
                            </td>
                        </tr>
                    </table>

            </div>
        </>
    )
}

export default ProductSpecifications
