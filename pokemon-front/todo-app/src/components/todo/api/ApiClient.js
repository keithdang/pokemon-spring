import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:5001' //#CHANGE
        // baseURL: 'http://hello-03.eba-b7ijmy2v.us-east-2.elasticbeanstalk.com/'
    }
);

/* For Best Practices https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables*/
