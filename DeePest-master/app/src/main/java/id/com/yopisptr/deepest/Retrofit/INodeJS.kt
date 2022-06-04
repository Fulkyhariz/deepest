package id.com.yopisptr.deepest.Retrofit

import io.reactivex.Observable
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface INodeJS {

    @POST("signup")
    @FormUrlEncoded
    fun registerUser(@Field("email") email:String,
                     @Field("password") password:String) :Observable<String>

    @POST("signin")
    @FormUrlEncoded
    fun loginUser(@Field("email") email:String,
                     @Field("password") password:String) :Observable<String>
}