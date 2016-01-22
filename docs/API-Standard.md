# API Standard

1.Database standard

if successed
the return value should be 

```javascript
    
    {
      status : true , 
      data : { name : good } // it could be a string or an object
    }

````

if failed

the return value should be 

```javascript

    {
      type : 0 //should be a int, and the error code number should be declared in javadoc
      msg : "this is an error message"
    }
    
```

all the return value should be processed in api, if error return only a string value indicate 
what the problem is, if success only return object when necessary, normally use string.