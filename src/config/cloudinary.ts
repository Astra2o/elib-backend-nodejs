import {v2 as cloudinary} from 'cloudinary';
import { conf } from './config';



    // Configuration
    cloudinary.config({ 
        cloud_name: conf.cloudName, 
        api_key: conf.cloudApiKey, 
        api_secret:conf.cloudApiSecret 
    });