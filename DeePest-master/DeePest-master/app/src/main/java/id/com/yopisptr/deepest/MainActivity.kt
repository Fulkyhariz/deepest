package id.com.yopisptr.deepest


import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import id.com.yopisptr.deepest.Retrofit.INodeJS
import id.com.yopisptr.deepest.Retrofit.RetrofitClient
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.activity_register.*


class MainActivity : AppCompatActivity() {

    lateinit var myAPI:INodeJS
    var compositeDisposable = CompositeDisposable()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //Init API
        var retrofit = RetrofitClient.instance
        myAPI = retrofit.create(INodeJS::class.java)

        findViewById<View>(R.id.coba).setOnClickListener {
            startActivity(
                Intent(
                    this@MainActivity,
                    RegisterActivity::class.java
                )
            )
        }
    }
}