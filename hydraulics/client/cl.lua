RegisterNUICallback('quit', function(data, cb)
    SetNuiFocus(false, false)
    SetPlayerControl(PlayerId(), true, 8)
    cb('ok')
end)

RegisterNUICallback('NewSuspension', function(data, cb)
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped, false)
    local plate = GetVehicleNumberPlateText(veh)
    SetVehicleSuspensionHeight(veh, data.NewHeight)
    TriggerServerEvent('broker:changeSuspension', veh, data.NewHeight, plate)
    cb('ok')
end)

RegisterCommand("airbags", function()
    local ped = PlayerPedId()
    if IsPedInAnyVehicle(ped, false) then
        SetPlayerControl(PlayerId(), false, 8)
        SetNuiFocus(true, true)
        local veh = GetVehiclePedIsIn(ped, false)
        local plate = GetVehicleNumberPlateText(veh)
        local model = GetEntityModel(veh)
        local height = GetVehicleSuspensionHeight(veh)
        SendNUIMessage({
            message = "OpenSuspension",
            CurrentHeight = height*1000
        })
    end
end)

RegisterNetEvent('broker:NewSuspension')
AddEventHandler('broker:NewSuspension', function(veh, height)
    SetVehicleSuspensionHeight(veh, height)
end)