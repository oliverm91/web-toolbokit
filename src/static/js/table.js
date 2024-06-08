Vue.component('table-component', {
    props: ['data'],
    template: `
        <table>
            <tbody>
                <tr>
                    <td v-for="(value, index) in data" :key="index">{{ value }}</td>
                </tr>
            </tbody>
        </table>
    `
});