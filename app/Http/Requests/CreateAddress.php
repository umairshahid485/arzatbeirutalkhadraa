<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAddress extends FormRequest{

    public function rules()
    {
        $type = $this->request->get('address_type');
        $fields   = ['full_name','email','mobile_number','country_code','area','block','street'];

        if ($type == "house"){
            array_push($fields,"house","avenue");
        }

        if ($type == "apartment"){
            array_push($fields,"building","floor","apartment_no","avenue");
        }

        if ($type == "office"){
            array_push($fields,"building","floor","office_no","avenue");
        }

        $required = [];
        foreach ($fields as $field){
            $required[$field] = "required|string";
        }

        return $required;
    }
}
