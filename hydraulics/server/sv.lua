RegisterServerEvent('broker:changeSuspension')
AddEventHandler('broker:changeSuspension', function(veh, height, plate)
    TriggerClientEvent('broker:NewSuspension', -1, veh, height)
end)