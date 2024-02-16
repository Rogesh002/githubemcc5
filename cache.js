const { cacheExpired } = require("../configs")
import redis from 'redis';

const getcache = async(key)=>{
    let result = JSON.parse(await redis.get(key));
    return result;
};

const setcache = async(key,value)=>{
    let stringfiedValue = JSON.stringify(value)
    return await setex(key,cacheExpired,stringfiedValue);
}

module.exports={
    getcache,setcache
}